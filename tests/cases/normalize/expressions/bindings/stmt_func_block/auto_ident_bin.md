# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident bin
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = $(1) + $(2);
    $(a);
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let a = $(1) + $(2);
    $(a);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpBinBothLhs = $(1);
  const tmpBinBothRhs = $(2);
  let a = tmpBinBothLhs + tmpBinBothRhs;
  $(a);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const a = tmpBinBothLhs + tmpBinBothRhs;
$(a);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a + b;
$( c );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
