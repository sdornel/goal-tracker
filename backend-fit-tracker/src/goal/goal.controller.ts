import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { GoalService } from './goal.service';
import { Goal } from 'src/entities/goal.entity';
import { QueryRunner } from 'typeorm';

@Controller('goals')
export class GoalController {
    constructor(private readonly goalService: GoalService) {}

    @Get('number-of-accomplished-goals')
    getNumberOfAccomplishedGoals(): Promise<number> {
      return this.goalService.getNumberOfAccomplishedGoals();
    }

    @Get()
    findAll(): Promise<{ long: Array<Goal>; short: Array<Goal>; }> {
      return this.goalService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.goalService.findOne(id);
    }
  
    @Post()
    create(@Body() goal: Goal) {
      return this.goalService.create(goal);
    }

    @Patch('complete-:id')
    completeGoal(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
      console.log('id', id);
      return this.goalService.completeGoal(id);
    }
  
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() goal: Partial<Goal>) {
      return this.goalService.update(id, goal);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.goalService.remove(id);
    }  
}
