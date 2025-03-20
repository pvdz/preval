# Preval test case

# flash1.md

> Normalize > Pattern > Param > Flash1
>
> https://twitter.com/buzyescayadev/status/1343866976939098113 

The actual case contains unnecessary complexity in defaults so those were replaced:

```js
function x([[[[[[foo = (y = a??z)]= {...[a(a?.b)]}]]]]], {x: {...x}}) {}
```

## Input

`````js filename=intro
function x([[[[[[foo = x] = y]]]]], {x: {...x}}) {}
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
