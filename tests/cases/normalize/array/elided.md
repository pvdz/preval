# Preval test case

# call.md

> normalize > new > call
>
> Make sure normalization doesn't choke over elided elements

## Input

`````js filename=intro
$([1, $(),, 2,, $(),,]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpElement$1;
tmpElement = $();
tmpElement$1 = $();
tmpArg = [1, tmpElement, , 2, , tmpElement$1, ,];
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpElement$1;
tmpElement = $();
tmpElement$1 = $();
tmpArg = [1, tmpElement, , 2, , tmpElement$1, ,];
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: 
 - 2: [1,null,null,2,null,null,null]
 - 3: undefined

Normalized calls: Same

Final output calls: Same
