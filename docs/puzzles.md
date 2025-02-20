# Design Puzzles

## Building Conditions

I wonder if it's possible to uniquely identify a scenario with player cards and AI cards with these three pieces of information: `case_id,` `scenario_id,` and "game index" (like if it's the first game).

## Previous Design

I have noticed weird duplications like `scenario_id` and `scenario_ID`. I wonder what's the difference. I'm currently removing those column duplications since it seems rows having different `scenario_ID` have the same information.
