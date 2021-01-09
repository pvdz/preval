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

## Uniformed

`````js filename=intro
var x;
x = 'str'.x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 'foo'.length;
$(tmpArg);
`````
