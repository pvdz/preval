# Preval test case

# init_member_call.md

> normalize > binding > init_member_call
>
> Binding declaration with a member expression call init should not be outlined

#TODO

## Input

`````js filename=intro
let x = "foo".toString();
$(x);
`````

## Normalized

`````js filename=intro
let x = 'foo'.toString();
$(x);
`````

## Output

`````js filename=intro
let x = 'foo'.toString();
$(x);
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
