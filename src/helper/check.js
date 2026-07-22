export function isApproved(assignment, fullname) {
  const foundAssignment = assignment.find((item) => item.fullname === fullname);

  if (foundAssignment && foundAssignment.is_approved === 1) {
    return true;
  }

  return false;
}
