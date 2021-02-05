# Preval test case

# init_double_member_call.md

> normalize > binding > init_double_member_call
>
> Binding declaration with a long init should be outlined

#TODO

## Input

`````js filename=intro
let x = "foo".length.toString();
$(x);
`````

## Normalized

`````js filename=intro
const tmpCallObj = 'foo'.length;
let x = tmpCallObj.toString();
$(x);
`````

## Output

`````js filename=intro
const tmpCallObj = 'foo'.length;
let x = tmpCallObj.toString();
$(x);
`````

## Result

Should call `$` with:
 - 1: '3'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
