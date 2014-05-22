vizzy
=====

Attach callbacks when an element is visible or invisible

```js
var $collection = $('.element');

$collection.vizzy({
  visible : function() {},
  
  invisible : function() {},
  
  toggleClass : 'is-visible',
  
  delay : 300
});
```
