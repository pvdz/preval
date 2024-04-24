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
while (true) {
  if (x) {
    check(x);
    x = /foo/;
    x.foo = `object`;
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let x = /foo/;
const tmpCalleeParam = x.foo;
$(tmpCalleeParam);
x = /foo/;
x.foo = `object`;
const tmpCalleeParam$1 = x.foo;
$(tmpCalleeParam$1);
x = /foo/;
x.foo = `object`;
const tmpCalleeParam$2 = x.foo;
$(tmpCalleeParam$2);
x = /foo/;
x.foo = `object`;
const tmpCalleeParam$3 = x.foo;
$(tmpCalleeParam$3);
x = /foo/;
x.foo = `object`;
const tmpCalleeParam$4 = x.foo;
$(tmpCalleeParam$4);
x = /foo/;
x.foo = `object`;
const tmpCalleeParam$5 = x.foo;
$(tmpCalleeParam$5);
x = /foo/;
x.foo = `object`;
const tmpCalleeParam$6 = x.foo;
$(tmpCalleeParam$6);
x = /foo/;
x.foo = `object`;
const tmpCalleeParam$7 = x.foo;
$(tmpCalleeParam$7);
x = /foo/;
x.foo = `object`;
const tmpCalleeParam$8 = x.foo;
$(tmpCalleeParam$8);
x = /foo/;
x.foo = `object`;
const tmpCalleeParam$9 = x.foo;
$(tmpCalleeParam$9);
x = /foo/;
x.foo = `object`;
const tmpCalleeParam$10 = x.foo;
$(tmpCalleeParam$10);
x = /foo/;
x.foo = `object`;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam$11 = x.foo;
  $(tmpCalleeParam$11);
  x = /foo/;
  x.foo = `object`;
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = /foo/;
const b = a.foo;
$( b );
a = /foo/;
a.foo = "object";
const c = a.foo;
$( c );
a = /foo/;
a.foo = "object";
const d = a.foo;
$( d );
a = /foo/;
a.foo = "object";
const e = a.foo;
$( e );
a = /foo/;
a.foo = "object";
const f = a.foo;
$( f );
a = /foo/;
a.foo = "object";
const g = a.foo;
$( g );
a = /foo/;
a.foo = "object";
const h = a.foo;
$( h );
a = /foo/;
a.foo = "object";
const i = a.foo;
$( i );
a = /foo/;
a.foo = "object";
const j = a.foo;
$( j );
a = /foo/;
a.foo = "object";
const k = a.foo;
$( k );
a = /foo/;
a.foo = "object";
const l = a.foo;
$( l );
a = /foo/;
a.foo = "object";
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const m = a.foo;
  $( m );
  a = /foo/;
  a.foo = "object";
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
