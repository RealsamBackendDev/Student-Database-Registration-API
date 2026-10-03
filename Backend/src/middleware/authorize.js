function authorize(...allowedPermissions) {
  return (req, res, next) => {
    const userPermissions = req.user?.permissions || [];
    const hasRequiredPermission = allowedPermissions.some((permission) => userPermissions.includes(permission));

    if (!hasRequiredPermission) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this resource.',
        code: 'FORBIDDEN'
      });
    }

    next();
  };
}

module.exports = authorize;
