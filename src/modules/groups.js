// src/groups.js
export function createGroupManager() {
  const groups = new Map();
  
  function ensure(groupId, strategy = 'merge') {
    if (!groups.has(groupId)) {
      groups.set(groupId, {
        id: groupId,
        strategy,
        ids: [],
        count: 0,
        meta: {},
      });
    }
    const group = groups.get(groupId);
    if (strategy) group.strategy = strategy;
    return group;
  }
  
  return {
    register(groupId, toastId, strategy = 'merge', meta = {}) {
      if (!groupId) return null;
      const group = ensure(groupId, strategy);
      if (!group.ids.includes(toastId)) {
        group.ids.push(toastId);
        group.count += 1;
      }
      group.meta = { ...group.meta, ...meta };
      return group;
    },
    
    unregister(groupId, toastId) {
      const group = groups.get(groupId);
      if (!group) return;
      group.ids = group.ids.filter((id) => id !== toastId);
      if (group.ids.length === 0) groups.delete(groupId);
    },
    
    get(groupId) {
      return groups.get(groupId) || null;
    },
    
    list() {
      return Array.from(groups.values()).map((g) => ({
        id: g.id,
        strategy: g.strategy,
        ids: g.ids.slice(),
        count: g.count,
        meta: { ...g.meta },
      }));
    },
    
    clear(groupId) {
      if (groupId) {
        groups.delete(groupId);
        return;
      }
      groups.clear();
    },
    
    has(groupId) {
      return groups.has(groupId);
    },
    
    size() {
      return groups.size;
    },
  };
}