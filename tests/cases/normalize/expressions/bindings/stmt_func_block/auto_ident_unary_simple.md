# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident unary simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let x = 1;

    let a = typeof x;
    $(a, x);
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let x = 1;
    let a = typeof x;
    $(a, x);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  let a = typeof x;
  $(a, x);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`number`, 1);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( "number", 1 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number', 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
