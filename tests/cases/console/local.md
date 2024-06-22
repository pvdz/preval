# Preval test case

# local.md

> Console > Local
>
>

## Input

`````js filename=intro
const console = {log: function(){ }};
console.log('yooo foo');
`````

## Pre Normal


`````js filename=intro
const console$1 = {
  log: function () {
    debugger;
  },
};
console$1.log(`yooo foo`);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = function () {
  debugger;
  return undefined;
};
const console$1 = { log: tmpObjLitVal };
console$1.log(`yooo foo`);
`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
