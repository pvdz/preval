# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
$('foo'.length);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = 'foo'.length;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 'foo'.length;
$(tmpArg);
`````

## Result

Should call `$` with:
[[3], null];

Normalized calls: Same

Final output calls: Same
