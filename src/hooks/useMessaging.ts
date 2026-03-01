export const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-100 text-blue-800',
      active: 'bg-green-100 text-green-800',
      resolved: 'bg-gray-100 text-gray-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };


  export const getStatusColor = (status: string) => {
      const colors: Record<string, string> = {
        new: 'bg-blue-100 text-blue-800',
        assigned: 'bg-purple-100 text-purple-800',
        active: 'bg-green-100 text-green-800',
        resolved: 'bg-gray-100 text-gray-800',
        archived: 'bg-gray-100 text-gray-600'
      };
      return colors[status] || 'bg-gray-100 text-gray-800';
    };