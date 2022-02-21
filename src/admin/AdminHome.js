import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFoodList,deleteFoodItem } from "../Action/FoodAction";
import "./admin.css";

function AdminHome() {

  const navigate = useNavigate()
  const foods = useSelector((state) => state.foods);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoodList());
  }, []);

  function editHandler(id){
    navigate(`/admin/additem/${id}`)
  }

  function addItemHandler(){
    navigate('/admin/additem')
  }

  const deleteHandler = (id)=>{
    dispatch(deleteFoodItem(id)).then(()=>{
      dispatch(getFoodList())
    })
  }

  if (!foods.length) {
    return (
      <>
    <div className="available-div">
        <button onClick={addItemHandler} className="add-items">Add Items</button>
      </div>
    <p>No Foods Available</p>
    </>
    );
  }
  return (
    <div className="mainFood">
      <div className="available-div">
        <h2>Available Food Items</h2>
        <button onClick={addItemHandler} className="add-items">Add Items</button>
      </div>
      {foods.map((food) => (
        <div key={food.id} className="food-div">
          <img src={food.url} alt='food' className="food-img" />
          <div>
            <p className="text-bold">{food.name}</p>
            <p className="text-gray">{food.desc}</p>
            <p className="text-grey">${food.price}</p>
          </div>
          <button className="edit-button" onClick={()=>editHandler(food.id)}>Edit</button>
          <button className="delete-button" onClick={()=>deleteHandler(food.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminHome;
