# Preval test case

# arrow_arguments.length.md

> Normalize > Arrow > Arrow arguments.length
>
> Basic case of this wrapping


```js
function f() {
  const args = arguments;
  const g = function(){
    return args.length;
  }

  return g(5, 6);
}
$(f(1, 2, 3, 4));
```

## Input

`````js filename=intro
function f() {
  const g = () => arguments.length;
  
  return g(5, 6);
}
$(f(1, 2, 3, 4));
`````

## Settled


`````js filename=intro
$(4);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const g = () => {
    debugger;
    return tmpPrevalAliasArgumentsLen;
  };
  return g(5, 6);
};
$(f(1, 2, 3, 4));
`````

## Normalized


`````js filename=intro
let f = function () {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const g = function () {
    debugger;
    return tmpPrevalAliasArgumentsLen;
  };
  const tmpReturnArg = g(5, 6);
  return tmpReturnArg;
};
const tmpCalleeParam = f(1, 2, 3, 4);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 4 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
