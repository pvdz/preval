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


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
`````


## Todos triggered


None


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
