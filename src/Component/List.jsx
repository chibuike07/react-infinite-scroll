import React from "react";

const List = ({ userId, title, body }) => {
  return (
    <div className="card p-2 mt-2">
      <h2 className="card-title">
        {title} {userId}
      </h2>
      <p className="card-body">{body}</p>
    </div>
  );
};

export default List;
