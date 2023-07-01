const bellmanFord = (grid, startNode, endNode) => {
    // An array to store all the visited nodes in order
    const visitedNodesInOrder = [];
  
    // Initialize distances and previous nodes arrays
    const nodes = getAllNodes(grid);
    for (const node of nodes) {
      node.distance = Infinity;
      node.previousNode = null;
    }
    startNode.distance = 0;
  
    // Relax edges repeatedly |V| - 1 times
    for (let i = 0; i < nodes.length - 1; i++) {
      for (const node of nodes) {
        if (node.isWall) continue; // Skip walled nodes
        for (const neighbor of getNeighbors(node, grid)) {
          if (neighbor.isWall) continue; // Skip walled neighbors
          const distance = node.distance + neighbor.weight;
          if (distance < neighbor.distance) {
            neighbor.distance = distance;
            neighbor.previousNode = node;
          }
        }
      }
    }
  
    // Check for negative cycles
    for (const node of nodes) {
      if (node.isWall) continue; // Skip walled nodes
      for (const neighbor of getNeighbors(node, grid)) {
        if (neighbor.isWall) continue; // Skip walled neighbors
        const distance = node.distance + neighbor.weight;
        if (distance < neighbor.distance) {
          // Negative cycle detected, return empty arrays
          return { visitedNodesInOrder: [], nodesInShortestPathOrder: [] };
        }
      }
    }
  
    // Traverse the shortest path from startNode to endNode
    let currentNode = endNode;
    const nodesInShortestPathOrder = [];
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
  
    // Get the visited nodes in order
    for (const node of nodes) {
      if (!node.isWall && node.distance !== Infinity) {
        visitedNodesInOrder.push(node);
      }
    }
  
    return { visitedNodesInOrder, nodesInShortestPathOrder };
  };
  
  // Utility function to get all the neighboring nodes of a given node
  const getNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;
  
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
    return neighbors;
  };
  
  // Utility function to get all the nodes from the grid
  const getAllNodes = (grid) => {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  };
  
  export { bellmanFord };
  