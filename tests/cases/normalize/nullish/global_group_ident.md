# Preval test case

# global_group_ident.md

> normalize > member_access > global_group_ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
const a = {x: 1}
const y = (1, a)??x
$(y);
`````

## Normalized

`````js filename=intro
var tmpNullish;
var tmpTernaryTest;
const a = { x: 1 };
1;
tmpNullish = a;
tmpTernaryTest = tmpNullish == null;
const y = tmpTernaryTest ? x : tmpNullish;
$(y);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x = { x: 8 };
8;
x = x;
x = x * x;
var x = x ? x : x;
x(x);
`````

## Output

`````js filename=intro
var tmpNullish;
var tmpTernaryTest;
const a = { x: 1 };
tmpNullish = a;
tmpTernaryTest = tmpNullish == null;
const y = tmpTernaryTest ? x : tmpNullish;
$(y);
`````
