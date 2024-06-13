# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  ({ x: $(1), y: 2, z: $(3) });
  $(a);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  ({ x: $(1), y: 2, z: $(3) });
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  $(1);
  $(3);
  $(a);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
$(3);
const a = { a: 999, b: 1000 };
$(a);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 3 );
const a = {
  a: 999,
  b: 1000,
};
$( a );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { a: '999', b: '1000' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
