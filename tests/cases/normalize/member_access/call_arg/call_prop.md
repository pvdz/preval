# Preval test case

# global_call_prop.md

> normalize > member_access > global_call_prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
$($('foo').length);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBindingInit = $('foo');
const tmpCalleeParam = tmpBindingInit.length;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
const tmpBindingInit = $('foo');
const tmpCalleeParam = tmpBindingInit.length;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 0: "foo"
 - 1: 3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
