# Preval test case

# call_no_yes_no.md

> normalize > optional > call_no_yes_no
>
> Mix optional with regular member call

#TODO

## Input

`````js filename=intro
const a = {};
$(a().b?.().c().d);
`````

## Normalized

`````js filename=intro
var tmpArg;
const a = {};
tmpArg = a().b?.()?.c?.()?.d;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
({});
tmpArg = a().b?.()?.c?.()?.d;
$(tmpArg);
`````
