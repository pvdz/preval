# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > Throw > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
throw (1, 2, $(b))?.x;
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
throw (1, 2, $(b))?.x;
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpThrowArg = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpThrowArg = tmpChainElementObject;
} else {
}
throw tmpThrowArg;
`````

## Output


`````js filename=intro
let tmpThrowArg = undefined;
const b = { x: 1 };
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpThrowArg = tmpChainElementObject;
}
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  const e = c.x;
  a = e;
}
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
