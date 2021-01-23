# Preval test case

# useless_arg.md

> normalize > delete > useless_arg
>
> Delete on non-property is valid but useless

#TODO

## Input

`````js filename=intro
let foo = 1;
$(delete (null, foo));
$(typeof foo)
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg$1;
let foo = 1;
null;
foo;
tmpArg = true;
$(tmpArg);
tmpArg$1 = typeof foo;
$(tmpArg$1);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg$1;
tmpArg = true;
$(tmpArg);
tmpArg$1 = 'number';
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: "number"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
