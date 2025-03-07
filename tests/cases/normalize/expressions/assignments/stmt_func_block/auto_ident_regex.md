# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = /foo/;
    $(a);
  }
}
$(f());
`````

## Settled


`````js filename=intro
const a /*:regex*/ = /foo/;
$(a);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(/foo/);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let a = { a: 999, b: 1000 };
    a = /foo/;
    $(a);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  a = /foo/;
  $(a);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = /foo/;
$( a );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
