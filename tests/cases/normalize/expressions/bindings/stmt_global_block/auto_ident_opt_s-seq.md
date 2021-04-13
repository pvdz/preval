# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident opt s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { x: 1 };

  let a = (1, 2, b)?.x;
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let b = { x: 1 };
  let a = (1, 2, b)?.x;
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
const b = { x: 1 };
let a = undefined;
const tmpIfTest = b != null;
if (tmpIfTest) {
  const tmpChainElementObject = b.x;
  a = tmpChainElementObject;
} else {
}
$(a);
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
