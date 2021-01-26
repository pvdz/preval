# Preval test case

# global_call_prop.md

> normalize > member_access > global_call_prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
let x = $('foo').length;
$(x);
`````

## Normalized

`````js filename=intro
const tmpBindingInit = $('foo');
let x = tmpBindingInit.length;
$(x);
`````

## Output

`````js filename=intro
const tmpBindingInit = $('foo');
let x = tmpBindingInit.length;
$(x);
`````

## Result

Should call `$` with:
 - 0: "foo"
 - 1: 3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
