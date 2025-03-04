# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident unary typeof complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let arg = 1;

    let a = typeof $(arg);
    $(a, arg);
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let arg = 1;
    let a = typeof $(arg);
    $(a, arg);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let arg = 1;
  const tmpUnaryArg = $(arg);
  let a = typeof tmpUnaryArg;
  $(a, arg);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const a /*:string*/ = typeof tmpUnaryArg;
$(a, 1);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
$( b, 1 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
