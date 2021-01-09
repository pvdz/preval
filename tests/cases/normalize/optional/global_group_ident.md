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
var tmpTernaryTest;
var tmpTernaryAlternate;
const a = { x: 1 };
1;
tmpOptionalChaining = a;
tmpTernaryTest = tmpOptionalChaining == null;
const y = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = tmpOptionalChaining.x), tmpTernaryAlternate);
$(y);
`````

## Output

`````js filename=intro
var tmpOptionalChaining;
var tmpTernaryTest;
var tmpTernaryAlternate;
const a = { x: 1 };
tmpOptionalChaining = a;
tmpTernaryTest = tmpOptionalChaining == null;
const y = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = tmpOptionalChaining.x), tmpTernaryAlternate);
$(y);
`````
