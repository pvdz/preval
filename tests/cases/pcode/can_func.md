# Preval test case

# can_func.md

> Pcode > Can func

## Options

- pcode

## Input

`````js filename=intro
rMwHazIJjv = function($$0) {
  let t = $$0;
  debugger;
  i$1 = function() {};
  return undefined;
};
`````


## Pcode output


`````fileintro
i$1 =
    [ return - undefined ]
`````




## Todos triggered


None


## Pcode result


Running function "i$1":

                                    pcode          =>   eval
 - `i$1()`                     => `undefined`      => `undefined`       Ok
 - `i$1(undefined)`            => `undefined`      => `undefined`       Ok
 - `i$1(null)`                 => `undefined`      => `undefined`       Ok
 - `i$1(true)`                 => `undefined`      => `undefined`       Ok
 - `i$1(false)`                => `undefined`      => `undefined`       Ok
 - `i$1("")`                   => `undefined`      => `undefined`       Ok
 - `i$1("preval")`             => `undefined`      => `undefined`       Ok
 - `i$1(0)`                    => `undefined`      => `undefined`       Ok
 - `i$1(1)`                    => `undefined`      => `undefined`       Ok
 - `i$1(0, 0)`                 => `undefined`      => `undefined`       Ok
 - `i$1(0, 1)`                 => `undefined`      => `undefined`       Ok
 - `i$1(1, 0)`                 => `undefined`      => `undefined`       Ok
 - `i$1(1, 1)`                 => `undefined`      => `undefined`       Ok