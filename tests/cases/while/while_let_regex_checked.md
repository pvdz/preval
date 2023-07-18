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
const x = /foo/;
const tmpCalleeParam = x.foo;
$(tmpCalleeParam);
const tmpClusterSSA_x = /foo/;
tmpClusterSSA_x.foo = `object`;
const tmpCalleeParam$1 = tmpClusterSSA_x.foo;
$(tmpCalleeParam$1);
const tmpClusterSSA_x$1 = /foo/;
tmpClusterSSA_x$1.foo = `object`;
const tmpCalleeParam$2 = tmpClusterSSA_x$1.foo;
$(tmpCalleeParam$2);
const tmpClusterSSA_x$2 = /foo/;
tmpClusterSSA_x$2.foo = `object`;
const tmpCalleeParam$3 = tmpClusterSSA_x$2.foo;
$(tmpCalleeParam$3);
const tmpClusterSSA_x$3 = /foo/;
tmpClusterSSA_x$3.foo = `object`;
const tmpCalleeParam$4 = tmpClusterSSA_x$3.foo;
$(tmpCalleeParam$4);
const tmpClusterSSA_x$4 = /foo/;
tmpClusterSSA_x$4.foo = `object`;
const tmpCalleeParam$5 = tmpClusterSSA_x$4.foo;
$(tmpCalleeParam$5);
const tmpClusterSSA_x$5 = /foo/;
tmpClusterSSA_x$5.foo = `object`;
const tmpCalleeParam$6 = tmpClusterSSA_x$5.foo;
$(tmpCalleeParam$6);
const tmpClusterSSA_x$6 = /foo/;
tmpClusterSSA_x$6.foo = `object`;
const tmpCalleeParam$7 = tmpClusterSSA_x$6.foo;
$(tmpCalleeParam$7);
const tmpClusterSSA_x$7 = /foo/;
tmpClusterSSA_x$7.foo = `object`;
const tmpCalleeParam$8 = tmpClusterSSA_x$7.foo;
$(tmpCalleeParam$8);
const tmpClusterSSA_x$8 = /foo/;
tmpClusterSSA_x$8.foo = `object`;
const tmpCalleeParam$9 = tmpClusterSSA_x$8.foo;
$(tmpCalleeParam$9);
const tmpClusterSSA_x$9 = /foo/;
tmpClusterSSA_x$9.foo = `object`;
const tmpCalleeParam$10 = tmpClusterSSA_x$9.foo;
$(tmpCalleeParam$10);
let tmpClusterSSA_x$10 = /foo/;
tmpClusterSSA_x$10.foo = `object`;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam$11 = tmpClusterSSA_x$10.foo;
  $(tmpCalleeParam$11);
  tmpClusterSSA_x$10 = /foo/;
  tmpClusterSSA_x$10.foo = `object`;
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = /foo/;
const b = a.foo;
$( b );
const c = /foo/;
c.foo = "object";
const d = c.foo;
$( d );
const e = /foo/;
e.foo = "object";
const f = e.foo;
$( f );
const g = /foo/;
g.foo = "object";
const h = g.foo;
$( h );
const i = /foo/;
i.foo = "object";
const j = i.foo;
$( j );
const k = /foo/;
k.foo = "object";
const l = k.foo;
$( l );
const m = /foo/;
m.foo = "object";
const n = m.foo;
$( n );
const o = /foo/;
o.foo = "object";
const p = o.foo;
$( p );
const q = /foo/;
q.foo = "object";
const r = q.foo;
$( r );
const s = /foo/;
s.foo = "object";
const t = s.foo;
$( t );
const u = /foo/;
u.foo = "object";
const v = u.foo;
$( v );
let w = /foo/;
w.foo = "object";
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x = w.foo;
  $( x );
  w = /foo/;
  w.foo = "object";
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
