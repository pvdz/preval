# Preval test case

# auto_ident_opt_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident opt simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let b = { x: 1 };

  let a = b?.x;
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let b = { x: 1 };
  let a = b?.x;
  $(a);
}
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
} else {
}
$(a);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
