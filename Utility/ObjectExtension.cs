using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using NorthwindAngular.ExtensionMethods;

namespace NorthwindAngular.ExtensionMethods
{
    // Deep Copy of Object in C#
    // Usage: var copy = anyObject.ShallowCopy()
    //        var copy = anyObject.DeepCopy();
    // http://www.c-sharpcorner.com/UploadFile/ff2f08/deep-copy-of-object-in-C-Sharp/
    // http://stackoverflow.com/questions/78536/deep-cloning-objects
    // https://msdn.microsoft.com/en-us/library/bb383977.aspx
    public static class ObjectExtension
    {
        // Implement Shallow Copy using Reflection
        // Using Object Extension Method
        public static Object ShallowCopy(this Object objSource)
        {
            // Get the type of source object and create a new instance of that type
            Type typeSource = objSource.GetType();
            Object objTarget = Activator.CreateInstance(typeSource);

            // Get all the properties of source object type
            PropertyInfo[] propertyInfo = typeSource.GetProperties(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);

            // Assign all source property to taget object's properties
            foreach (PropertyInfo property in propertyInfo)
            {
                // Check whether property can be written to
                if (property.CanWrite)
                {
                    // Check whether property type is value type, enum or string type
                    TypeInfo typeInfo = property.GetType().GetTypeInfo();
                    if (typeInfo.IsValueType ||
                        typeInfo.IsEnum ||
                        property.PropertyType.Equals(typeof(System.String)))
                    {
                        property.SetValue(objTarget, property.GetValue(objSource, null), null);
                    }
                    // else property type is object/complex type, so need to recursively call this method 
                    // until the end of the tree is reached
                    else
                    {
                        Object objPropertyValue = property.GetValue(objSource, null);
                        if (objPropertyValue == null)
                        {
                            property.SetValue(objTarget, null, null);
                        }
                        else
                        {
                            property.SetValue(objTarget, objPropertyValue, null);
                        }
                    }
                }
            }
            return objTarget;
        }

        // Implement Deep Copy using Reflection
        // Using Object Extension Method
        public static Object DeepCopy(this Object objSource)
        {
            // Get the type of source object and create a new instance of that type
            Type typeSource = objSource.GetType();
            Object objTarget = Activator.CreateInstance(typeSource);

            // Get all the properties of source object type
            PropertyInfo[] propertyInfo = typeSource.GetProperties(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);

            // Assign all source property to taget object's properties
            foreach (PropertyInfo property in propertyInfo)
            {
                // Check whether property can be written to
                if (property.CanWrite)
                {
                    // Check whether property type is value type, enum or string type
                    TypeInfo typeInfo = property.GetType().GetTypeInfo();
                    if (typeInfo.IsValueType || 
                        typeInfo.IsEnum || 
                        property.PropertyType.Equals(typeof(System.String)))
                    {
                        property.SetValue(objTarget, property.GetValue(objSource, null), null);
                    }
                    // else property type is object/complex type, so need to recursively call this method 
                    // until the end of the tree is reached
                    else
                    {
                        Object objPropertyValue = property.GetValue(objSource, null);
                        if (objPropertyValue == null)
                        {
                            property.SetValue(objTarget, null, null);
                        }
                        else
                        {
                            property.SetValue(objTarget, objPropertyValue.DeepCopy(), null);
                        }
                    }
                }
            }
            return objTarget;
        }
    }
}
