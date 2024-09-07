# Preval test case

# self_assign_lhs.md

> Pcode > Self assign lhs

## Options

- pcode

## Input

`````js filename=intro
function f(a) {
  a = ~a;
  return a;
}

$(f(1));
$(f(2));
$(f('a'));
$(f(true));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  a = ~a;
  return a;
};
$(f(1));
$(f(2));
$(f(`a`));
$(f(true));
`````

## Pcode output

`````fileintro
f =
    [ r0 = $$0 - ]
    [ r0 ~ r0 - ]
    [ return r0 - ]
`````

Running function "f":

                                    pcode          =>   eval
 - `f()`                       => `-1`             => `-1`              Ok
 - `f(undefined)`              => `-1`             => `-1`              Ok
 - `f(null)`                   => `-1`             => `-1`              Ok
 - `f(true)`                   => `-2`             => `-2`              Ok
 - `f(false)`                  => `-1`             => `-1`              Ok
 - `f("")`                     => `-1`             => `-1`              Ok
 - `f("preval")`               => `-1`             => `-1`              Ok
 - `f(0)`                      => `-1`             => `-1`              Ok
 - `f(1)`                      => `-2`             => `-2`              Ok
 - `f(0, 0)`                   => `-1`             => `-1`              Ok
 - `f(0, 1)`                   => `-1`             => `-1`              Ok
 - `f(1, 0)`                   => `-2`             => `-2`              Ok
 - `f(1, 1)`                   => `-2`             => `-2`              Ok
 - `f(1)`                      => `-2`             => `-2`              Ok
 - `f(2)`                      => `-3`             => `-3`              Ok
 - `f("a")`                    => `-1`             => `-1`              Ok
 - `f(true)`                   => `-2`             => `-2`              Ok
