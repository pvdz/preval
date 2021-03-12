# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Statement > Throw > Auto ident nested member complex bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
throw ($(b)[$("x")] = $(c)[$("y")] = d + e);
$(a, b, c, d, e);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;
let a = { a: 999, b: 1000 };
throw ($(b)[$('x')] = $(c)[$('y')] = d + e);
$(a, b, c, d, e);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $('x');
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $('y');
const varInitAssignLhsComputedRhs$1 = d + e;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpThrowArg = varInitAssignLhsComputedRhs;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $('x');
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $('y');
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 7;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
throw 7;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - eval returned: ('<crash[ 7 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
