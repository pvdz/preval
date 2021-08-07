# Preval test case

# while_let_regex_checked.md

> While > While let regex checked
>
> A regex is always truthy

The point of this check is to verify that the system treats regex like the object it is and not like an immutable primitive.

It may fluke an optimization where it incorrectly eliminates and outlines the property. But at the time of writing, this was working correct.

#TODO

## Input

`````js filename=intro
function check(r) {
  $(r.foo);
}
let x = /foo/; 
while (x) {
  check(x);
  x = /foo/;
  x.foo = "object";
}
`````

## Pre Normal

`````js filename=intro
let check = function ($$0) {
  let r = $$0;
  debugger;
  $(r.foo);
};
let x = /foo/;
while (x) {
  check(x);
  x = /foo/;
  x.foo = `object`;
}
`````

## Normalized

`````js filename=intro
let check = function ($$0) {
  let r = $$0;
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = r.foo;
  tmpCallCallee(tmpCalleeParam);
  return undefined;
};
let x = /foo/;
while (x) {
  check(x);
  x = /foo/;
  x.foo = `object`;
}
`````

## Output

`````js filename=intro
let x = /foo/;
while (true) {
  const tmpCalleeParam = x.foo;
  $(tmpCalleeParam);
  x = /foo/;
  x.foo = `object`;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 'object'
 - 3: 'object'
 - 4: 'object'
 - 5: 'object'
 - 6: 'object'
 - 7: 'object'
 - 8: 'object'
 - 9: 'object'
 - 10: 'object'
 - 11: 'object'
 - 12: 'object'
 - 13: 'object'
 - 14: 'object'
 - 15: 'object'
 - 16: 'object'
 - 17: 'object'
 - 18: 'object'
 - 19: 'object'
 - 20: 'object'
 - 21: 'object'
 - 22: 'object'
 - 23: 'object'
 - 24: 'object'
 - 25: 'object'
 - 26: 'object'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
