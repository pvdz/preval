// A function that is guaranteed to return bools may be eligible for inverting 

function f() {
  if ($) {
    return $ === $($); // Doesn't matter what $ is, the function will return true or false.
  } else {
    return false;
  }
}
// These inverts can be dropped by inverting all return values of `f`
$(!f(), 'one');
$(!f(), 'two');
$(!f(), 'three');
