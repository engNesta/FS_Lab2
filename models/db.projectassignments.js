db.projectassignments.updateMany(
    { "employee_id": { "$exists": true } },
    [{ "$set": { "employee_id": { "$toObjectId": "$employee_id" }}}]
  );
  