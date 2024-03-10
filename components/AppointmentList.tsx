const Index = ({ appointments }) => {
  return (
    <div className=" text-2xl border">
      {/* Render appointments */}
      {appointments.map(({ title, id, startTime, endTime, vendorId }) => (
        <>
          <div key={id}>{title}</div>
          <div>{startTime}</div>
          <div>{endTime}</div>
          <div>{vendorId}</div>
        </>
      ))}
    </div>
  );
};

export default Index;
