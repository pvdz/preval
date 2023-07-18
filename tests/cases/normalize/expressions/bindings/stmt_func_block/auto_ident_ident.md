# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = 1;

    let a = b;
    $(a, b);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let b = 1;
    let a = b;
    $(a, b);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = 1;
  let a = b;
  $(a, b);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1, 1);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1, 1 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
