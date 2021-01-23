# Preval test case

# global_group_ident.md

> normalize > member_access > global_group_ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
const a = {x: 1}
const y = (1, a)?.x
$(y);
`````

## Normalized

`````js filename=intro
var tmpOptionalChaining;
var tmpTernaryAlternate;
var tmpTernaryTest;
const a = { x: 1 };
1;
tmpOptionalChaining = a;
tmpTernaryTest = tmpOptionalChaining == null;
let y;
if (tmpTernaryTest) {
  y = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining.x;
  y = tmpTernaryAlternate;
}
$(y);
`````

## Output

`````js filename=intro
var tmpOptionalChaining;
var tmpTernaryAlternate;
var tmpTernaryTest;
const a = { x: 1 };
tmpOptionalChaining = a;
tmpTernaryTest = tmpOptionalChaining == null;
let y;
if (tmpTernaryTest) {
  y = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining.x;
  y = tmpTernaryAlternate;
}
$(y);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
