# Preval test case

# global_call_prop.md

> normalize > member_access > global_call_prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
$(parseInt(15)??foo);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = parseInt(15);
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = foo;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = parseInt(15);
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = foo;
}
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 15
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
