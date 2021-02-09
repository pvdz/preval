# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
const y = (1, 2, $())??foo
$(y);
`````

## Normalized

`````js filename=intro
let y = $();
const tmpIfTest = y == null;
if (tmpIfTest) {
  y = foo;
}
$(y);
`````

## Output

`````js filename=intro
let y = $();
const tmpIfTest = y == null;
if (tmpIfTest) {
  y = foo;
}
$(y);
`````

## Result

Should call `$` with:
 - 1: 
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
