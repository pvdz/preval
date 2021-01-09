# Preval test case

# global_group_literal.md

> normalize > member_access > global_group_literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
const y = (1, 2, 3)??foo
$(y);
`````

## Normalized

`````js filename=intro
var tmpNullish;
var tmpTernaryTest;
1;
2;
tmpNullish = 3;
tmpTernaryTest = tmpNullish == null;
const y = tmpTernaryTest ? foo : tmpNullish;
$(y);
`````

## Output

`````js filename=intro
var tmpNullish;
var tmpTernaryTest;
tmpNullish = 3;
tmpTernaryTest = tmpNullish == null;
const y = tmpTernaryTest ? foo : tmpNullish;
$(y);
`````
