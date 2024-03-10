const Index = ({ appointments }) => {
  return (
    <div className=" text-2xl border">
      {/* Render appointments */}
      {appointments.map(
        ({ title, id, startTime, endTime, buyerName, vendorName }) => (
          <>
            <div key={id}>{title}</div>
            <div>{startTime}</div>
            <div>{endTime}</div>
            <div>{buyerName}</div>
            <div>{vendorName}</div>
          </>
        )
      )}
    </div>
  );
};

export default Index;
