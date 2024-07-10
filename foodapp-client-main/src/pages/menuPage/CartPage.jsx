import React, { useContext, useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [cartItems, setCartItems] = useState([]);
  // console.log(cartItems)

  // Calculate the total price for each item in the cart
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };
  // Handle quantity increase
  const handleIncrease = async (item) => {
    try {
      const response = await fetch(`http://localhost:6001/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });

      if (response.ok) {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        await refetch();
        setCartItems(updatedCart);
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  // Handle quantity decrease
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(
          `http://localhost:6001/carts/${item._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: item.quantity - 1 }),
          }
        );

        if (response.ok) {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          await refetch();
          setCartItems(updatedCart);
        } else {
          console.error("Failed to update quantity");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  // Calculate the cart subtotal
  const cartSubtotal = cart.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  // Calculate the order total
  const orderTotal = cartSubtotal;
  // console.log(orderTotal)

  // delete an item
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:6001/carts/${item._id}`)
          .then((response) => {
            if (response) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  return (
<div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-16">
  {/* Banner */}
  <div className="bg-gradient-to-r from-green via-blue to-purple-600 rounded-lg shadow-lg">
    <div className="py-28 flex flex-col items-center justify-center">
      {/* Content */}
      <div className="text-center px-4 space-y-7">
        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug text-white">
          Items Added To The <span className="text-yellow-500">Cart</span>
        </h2>
      </div>
    </div>
  </div>

  {/* Cart Table */}
  {cart.length > 0 ? (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          {/* Head */}
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Food</th>
              <th className="py-2 px-4">Item Name</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={item.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 font-medium">{item.name}</td>
                <td className="py-2 px-4">
                  <button
                    className="btn btn-xs bg-red text-white"
                    onClick={() => handleDecrease(item)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={() => console.log(item.quantity)}
                    className="w-10 mx-2 text-center border border-gray-300 rounded"
                  />
                  <button
                    className="btn btn-xs bg-blue text-white"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </button>
                </td>
                <td className="py-2 px-4">${calculateTotalPrice(item).toFixed(2)}</td>
                <td className="py-2 px-4">
                  <button
                    className="btn btn-sm text-red border-transparent"
                    onClick={() => handleDelete(item)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr className="my-6" />
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="md:w-1/2 space-y-3">
          <h3 className="text-lg font-semibold">Customer Details</h3>
          <p>Name: {user?.displayName || "None"}</p>
          <p>Email: {user?.email}</p>
          <p>
            User ID: <span className="text-sm">{user?.uid}</span>
          </p>
        </div>
        <div className="md:w-1/2 space-y-3">
          <h3 className="text-lg font-semibold">Shopping Details</h3>
          <p>Total Items: {cart.length}</p>
          <p>
            Total Price:{" "}
            <span id="total-price">${orderTotal.toFixed(2)}</span>
          </p>
          <Link to="/process-checkout">
            <button className="btn btn-md bg-blue hover:bg-green text-white px-8 py-1 rounded">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center mt-20">
      <p className="text-lg font-semibold">Cart is empty. Please add products.</p>
      <Link to="/menu">
        <button className="btn bg-green hover:bg-green-700 text-white mt-3 px-6 py-2 rounded hover:text-black">
          Back to Menu
        </button>
      </Link>
    </div>
  )}
</div>

  );
};

export default CartPage;
