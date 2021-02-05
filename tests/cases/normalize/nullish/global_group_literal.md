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
1;
2;
let y = 3;
const tmpIfTest = y == null;
if (tmpIfTest) {
  y = foo;
}
$(y);
`````

## Output

`````js filename=intro
let y = 3;
const tmpIfTest = y == null;
if (tmpIfTest) {
  y = foo;
}
$(y);
`````

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
