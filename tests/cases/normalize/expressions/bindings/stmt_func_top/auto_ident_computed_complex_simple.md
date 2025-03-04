# Preval test case

# auto_ident_computed_complex_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident computed complex simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = { c: 1 };

  let a = $(b)["c"];
  $(a, b);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 1 };
  let a = $(b)[`c`];
  $(a, b);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 1 };
  const tmpCompObj = $(b);
  let a = tmpCompObj.c;
  $(a, b);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const a /*:unknown*/ = tmpCompObj.c;
$(a, b);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
$( c, a );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 1, { c: '1' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
