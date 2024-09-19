# Preval test case

# while_let_regex_checked2.md

> While > While let regex checked2
>
> A regex is always truthy

The point of this check is to verify that the system treats regex like the
object it is and not like an immutable primitive.

It may fluke an optimization where it incorrectly eliminates and outlines
the property. But at the time of writing, this was working correct.

## Input

`````js filename=intro
function check(r) {
  $(r.foo);
}
let x = /foo/; 
while (x) {
  check(x);
  if ($(x)) break;
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
  if ($(x)) break;
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
    const tmpIfTest = $(x);
    if (tmpIfTest) {
      break;
    } else {
      x = /foo/;
      x.foo = `object`;
    }
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
const x /*:regex*/ = /foo/;
const tmpCalleeParam = x.foo;
$(tmpCalleeParam);
const tmpIfTest = $(x);
if (tmpIfTest) {
} else {
  let tmpClusterSSA_x /*:regex*/ = /foo/;
  tmpClusterSSA_x.foo = `object`;
  while ($LOOP_UNROLL_10) {
    const tmpCalleeParam$1 = tmpClusterSSA_x.foo;
    $(tmpCalleeParam$1);
    const tmpIfTest$1 = $(tmpClusterSSA_x);
    if (tmpIfTest$1) {
      break;
    } else {
      tmpClusterSSA_x = /foo/;
      tmpClusterSSA_x.foo = `object`;
    }
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = /foo/;
const b = a.foo;
$( b );
const c = $( a );
if (c) {

}
else {
  let d = /foo/;
  d.foo = "object";
  while ($LOOP_UNROLL_10) {
    const e = d.foo;
    $( e );
    const f = $( d );
    if (f) {
      break;
    }
    else {
      d = /foo/;
      d.foo = "object";
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
