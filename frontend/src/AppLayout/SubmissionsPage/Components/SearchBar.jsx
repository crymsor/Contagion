function SearchBar() {
  return (
    <>
      <input type="text" placeholder="Search Submissions..." />

      <select>
        <option value="allStatus">All Status</option>
        <option value="approved">Approved</option>
        <option value="underreview">Under Review</option>
        <option value="draft">Draft</option>
        <option value="rejected">Rejected</option>
      </select>

      <select>
        <option value="allfamilies">All Families</option>
        <option value="ransomware">Ransomware</option>
        <option value="trojan">Trojan</option>
        <option value="worm">Worm</option>
        <option value="apt">APT</option>
      </select>
    </>
  )
}

export default SearchBar;
